import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from "../redux/axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsDetail } from "../redux/slices/posts";

export const FullPost = () => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  const {id} = useParams()

  const comments = useSelector((state)=>state.posts.posts.items)
  const dispath = useDispatch()

  useEffect(()=>{
    dispath(fetchPostsDetail(window.location.href.split('/')[4]))
  }, [])




  React.useEffect(()=>{
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data)
        setLoading(false)   
    })
    .catch((err) => {
      console.warn(err);
      alert('Ошибка при получений статьи')
    })

  .catch((err) => {
    console.warn(err);
    alert('Ошибка при получений статьи')
  })

  },[])

  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost /> 
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}`: ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.length - 1}
        tags={data.tags}
        isFullPost
      >
        <p>
            <ReactMarkdown children={data.text} />
        </p>
      </Post>
        <CommentsBlock
          comments={comments.slice(1, comments.length)}
          isLoading={isLoading}
        >
          <Index />
        </CommentsBlock>   
    </>
  );
};
