
import BlogDetails from "@/components/modules/home/Blog-Details";
import { getSingleBlog } from "@/services/blogs";

const BlogDetailsPage = async ({params}:{params: any}) => {
  const { blogId } = await params;

  const { data: blog } = await getSingleBlog(blogId);
  console.log(blog)


  return (
    
      <div className="flex justify-center items-center mx-auto my-10 w-screen">
        <BlogDetails blog={blog} />
     
 
      </div>
  );
};

export default BlogDetailsPage;
