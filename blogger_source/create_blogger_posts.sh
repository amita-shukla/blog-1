#!/bin/bash
mkdir "blogger_posts"
json_file_name="blogger_posts.json"
echo "reading ${json_file_name}..."
readarray -t slugs < <(cat ${json_file_name} | jq .allBloggerPost.edges[].node.slug)
readarray -t titles < <(cat ${json_file_name} | jq .allBloggerPost.edges[].node.title)
readarray -t dates < <(cat ${json_file_name} | jq .allBloggerPost.edges[].node.childMarkdownRemark.frontmatter.date)
readarray -t markdownBodies < <(cat ${json_file_name} | jq .allBloggerPost.edges[].node.childMarkdownRemark.rawMarkdownBody)
# tags=`jq .allBloggerPost.edges[].node.childMarkdownRemark.tags ${json_file_name}`

post_count=${#slugs[@]}
echo "number of posts are ${post_count}"

for((i=0; i<${postCount}; i++));
do
  title=${titles[$i]}
  echo "reading post ${i}: ${title}"
  slug=${slugs[$i]}
  date=${dates[$i]}
  markdown_body=${markdownBodies[$i]}
  dir_name=${date}--${slug}
  file_name="index.md"
  tags=${tags[$i]}
  join_tags=$(printf ",\"%s" "${tags[@]}")
  file_content="---\ntitle:${title}\ntags:[${join_tags}]\nauthor: Amita Shukla---\n\n${markdown_body}"
  file_path=${dir_name}/${file_name}
  mkdir ${dir_name}
  echo "adding content to file ${file_path}"
  echo -e ${file_content} > ${file_path}
done
echo "all files processed successfully"
