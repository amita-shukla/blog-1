#!/bin/bash

trim_quotes() {
  opt=$1
  str=$(echo "$opt" | sed -e 's/^"//' -e 's/"$//')
  echo $str
}



posts_dir="blogger_posts"
mkdir $posts_dir
json_file_name="blogger_posts.json"
echo "reading ${json_file_name}..."
readarray -t slugs < <(cat ${json_file_name} | jq .data.allBloggerPost.edges[].node.slug)
echo "slugs: ${slugs[@]}"
readarray -t titles < <(cat ${json_file_name} | jq .data.allBloggerPost.edges[].node.title)
echo "titles: ${titles[@]}"
readarray -t dates < <(cat ${json_file_name} | jq .data.allBloggerPost.edges[].node.childMarkdownRemark.frontmatter.date)
echo "dates: ${dates[@]}"
readarray -t markdownBodies < <(cat ${json_file_name} | jq .data.allBloggerPost.edges[].node.childMarkdownRemark.rawMarkdownBody)
echo "mardownBody: ${markdownBodies[2]}"
# tags=`jq .allBloggerPost.edges[].node.childMarkdownRemark.tags ${json_file_name}`

post_count=${#slugs[@]}
echo "number of posts are ${post_count}"

for(( i=0; i<${post_count}; i++ ))
do
  title=$(trim_quotes ${titles[$i]})
  echo "reading post ${i}: ${title}"
  slug=$(trim_quotes ${slugs[$i]})
  date=$(trim_quotes ${dates[$i]})
  markdown_body=$(trim_quotes "${markdownBodies[$i]}")
  file_content="---\ntitle: ${title}\n\nauthor: Amita Shukla\n---\n\n${markdown_body}"
  echo "file_content: ${file_content}"
  dir_name=${date}--${slug}
  file_name="index.md"
  file_path=${posts_dir}/${dir_name}/${file_name}
  mkdir ${posts_dir}/${dir_name}
  # tags=${tags[$i]}
  # join_tags=$(printf ",\"%s" "${tags[@]}")
  # file_content="---\ntitle:${title}\ntags:[${join_tags}]\nauthor: Amita Shukla---\n\n${markdown_body}"
  echo "adding content to file ${file_path}"
  echo -e ${file_content} > ${file_path}
done
echo "all files processed successfully"