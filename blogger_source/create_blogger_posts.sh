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
  cover_image=$(basename "$cover_image_url")
  markdown_body=$(trim_quotes "${markdownBodies[$i]}")
  file_content="---\ntitle: ${title}\ntags: ${tag}\ncover: ${cover_image}\nauthor: Amita Shukla\n---\n\n${markdown_body}"
  # echo "file_content: ${file_content}"
  dir_name=${date}--${slug}
  file_name="index.md"
  post_dir=${posts_dir}/${dir_name}
  file_path=${post_dir}/${file_name}
  mkdir ${post_dir}
  # join_tags=$(printf ",\"%s" "${tags[@]}")
  # file_content="---\ntitle:${title}\ntags:[${join_tags}]\nauthor: Amita Shukla---\n\n${markdown_body}"
  echo "adding content to file ${file_path}"
  echo -e ${file_content} > ${file_path}
  echo "reading ${file_path} for imageurls..."
  img_urls_file=${post_dir}/img_urls.txt
  grep -Eo "https?://[^][ ]+.(jpg|png|gif)" $file_path | sort -u > ${img_urls_file}
  echo "downloading urls..."
  wget -i ${img_urls_file} -P ${post_dir}
  echo "images for $slug downloaded."
  echo "replacing image urls with image tag"
  while read line
  do
    echo "url read: $line"
    base_img_file=$(basename $line)
    echo "base_img_file: $base_img_file"
    echo "running command: sed -i \"s~.*${line}.*~<re-img src=\"${base_img_file}\"></re-img>~g\" ${file_path}"
    sed -i "s~.*${line}.*~<re-img src=\"${base_img_file}\"></re-img>~g" ${file_path}
  done < ${img_urls_file}
done
echo "all files processed successfully"