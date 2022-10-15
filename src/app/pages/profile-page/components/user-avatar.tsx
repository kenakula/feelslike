/* eslint-disable jsx-a11y/label-has-associated-control */
import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UploadIcon from '@mui/icons-material/Upload';
import { stringToColor } from 'app/shared/utils';
import React from 'react';

const FileInput = styled('input')({
  display: 'none',
});

interface Props {
  profileImage: string;
  email: string;
  handleDelete: () => void;
  handleUpload: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserAvatar = ({
  profileImage,
  email,
  handleDelete,
  handleUpload,
}: Props): JSX.Element => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          backgroundColor: stringToColor(email),
        }}
        src={profileImage}
      />
      {profileImage.length ? (
        <Tooltip title="Удалить аватар">
          <IconButton
            sx={{ position: 'absolute', right: -8, top: -8 }}
            color="error"
            onClick={handleDelete}
          >
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : null}
      <label htmlFor="contained-button-file">
        <FileInput
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={handleUpload}
        />
        <IconButton
          sx={{
            position: 'absolute',
            right: -8,
            bottom: -8,
          }}
          color="primary"
          aria-label="Загрузить аватар"
          component="span"
        >
          <UploadIcon fontSize="small" />
        </IconButton>
      </label>
    </Box>
  );
};
