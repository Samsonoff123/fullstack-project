import React, { useRef } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "../../redux/axios";
import { fetchPostsDetail } from "../../redux/slices/posts";

export const Index = () => {
  const profile = useSelector((state)=>state.auth.data)
  const [value, setValue] = useState('')
  const dispath = useDispatch()

  const sendComment = () => {
    if (value !== '') {
      axios.post(`http://localhost:4444/posts/${window.location.href.split('/')[4]}/comments`, {
        text: value,
      })
        .then((res) => {
          if (res.data) {
            dispath(fetchPostsDetail(window.location.href.split('/')[4]))
            setValue('')
          }
        })
    }
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={profile.avatarUrl}
        />
        <div className={styles.form}>
          <TextField
            value={value}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            onChange={(event)=>setValue(event.target.value)}
          />
          <Button onClick={sendComment} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
