import React from "react"
import BlogList from "../components/BlogList"
import CreateBlog from "../components/CreateBlog.jsx"

export default function HomePage() {
    return (
      <div>
        <h1>Welcome to the home page fellas</h1>
        <CreateBlog />
        <BlogList />
      </div>
    )
  }