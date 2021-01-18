#!/bin/bash

trim_quotes() {
  opt=$1
  str=$(echo "$opt" | sed -e 's/^"//' -e 's/"$//')
  echo $str
}



posts_dir="blogger_posts"
mkdir $posts_dir
# json_file_name="blogger_posts.json"
json_file_name="blogger_posts_v2.json"
echo "reading ${json_file_name}..."
readarray -t slugs < <(cat ${json_file_name} | jq .data.allBloggerPost.edges[].node.slug)
echo "slugs: ${slugs[@]}"
readarray -t titles < <(cat ${json_file_name} | jq .data.allBloggerPost.edges[].node.title)
echo "titles: ${titles[@]}"
readarray -t dates < <(cat ${json_file_name} | jq .data.allBloggerPost.edges[].node.childMarkdownRemark.frontmatter.date)
echo "dates: ${dates[@]}"
readarray -t markdownBodies < <(cat ${json_file_name} | jq .data.allBloggerPost.edges[].node.childMarkdownRemark.rawMarkdownBody)
echo "mardownBody: ${markdownBodies[2]}"
readarray -t tags < <(cat ${json_file_name} | jq -c .data.allBloggerPost.edges[].node.labels)
echo "tags: ${tags[@]}"
readarray -t cover_images < <(cat ${json_file_name} | jq .data.allBloggerPost.edges[].node.childMarkdownRemark.frontmatter.image)

post_count=${#slugs[@]}
echo "number of posts are ${post_count}"

for(( i=0; i<${post_count}; i++ ))
do
  title=$(trim_quotes "${titles[$i]}")
  echo "reading post ${i}: ${title}"
  slug=$(trim_quotes "${slugs[$i]}")
  date=$(trim_quotes "${dates[$i]}")
  tag="${tags[$i]}"
  cover_image_url=$(trim_quotes "${cover_images[$i]}")
  # if [ "${cover_image_url}" == "no-image" ]; then 
  #   echo "resettting url for post idx $i..."
  #   cover_image_url=""
  # fi  
  cover_image=$(basename "$cover_image_url")
  markdown_body=$(trim_quotes "${markdownBodies[$i]}")
  file_content="---\ntitle: ${title}\ntags: ${tag}\ncover: ${cover_image}\nauthor: Amita Shukla\n---\n\n${markdown_body}"
  echo "file_content: ${file_content}"
  dir_name=${date}--${slug}
  file_name="index.md"
  file_path=${posts_dir}/${dir_name}/${file_name}
  mkdir ${posts_dir}/${dir_name}
  # join_tags=$(printf ",\"%s" "${tags[@]}")
  # file_content="---\ntitle:${title}\ntags:[${join_tags}]\nauthor: Amita Shukla---\n\n${markdown_body}"
  echo "adding content to file ${file_path}"
  echo -e ${file_content} > ${file_path}
done
echo "all files processed successfully"