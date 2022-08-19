import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios from '../redux/axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPopularPosts, fetchPosts, fetchTags } from '../redux/slices/posts';
import { fetchUserData } from '../redux/slices/auth'

export const Home = () => {
  
  const dispath = useDispatch()
  const userData = useSelector((state) => state.auth.data)

  const { posts, tags } = useSelector(state => state.posts)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'
  const [tabIndex, setTabIndex] = React.useState(0);
  
  React.useEffect(()=>{
    dispath(fetchPosts())
    dispath(fetchTags())
  }, [])


const sortByPopular = () => {
  dispath(fetchPopularPosts())
  setTabIndex(1)
}

const sortByNew = () => {
  dispath(fetchPosts())
  setTabIndex(0)
}

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={tabIndex} aria-label="basic tabs example">
        <Tab onClick={sortByNew} label="Новые" />
        <Tab onClick={sortByPopular} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ):(
              <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}`: ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.comments.length - 1}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          {
            posts.items.map(e => 
              <CommentsBlock
                comments={e.comments.slice(1, e.comments.length)}
                isLoading={false}
              />
            )
          }

        </Grid>
      </Grid>
    </>
  );
};
