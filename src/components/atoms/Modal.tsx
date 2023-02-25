import { Box, Divider, IconButton, Modal as ModalComponent, Stack, SxProps } from '@mui/material';
import React, { FC, ReactNode, useLayoutEffect, useState } from 'react';
import { colors } from 'themes/common/colors';
import { VoidFunc } from 'types/general';
import noop from 'lodash/noop';
import { Typography } from './Typography';
import { RemoveMenuIcon } from 'assets';

type ModalProps = {
  isModal: boolean;
  header?: ReactNode | (() => ReactNode);
  body?: ReactNode | (() => ReactNode);
  bodyStyles?: SxProps;
  footer?: ReactNode | ((actionFunc?: (status: boolean) => void) => ReactNode);
  onClose?: VoidFunc;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  wrapStyles?: SxProps;
  titleStyles?: SxProps;
  disableDivider?: boolean;
};
const Modal: FC<ModalProps> = ({
  isModal,
  header,
  footer,
  body,
  bodyStyles,
  onClose = noop,
  wrapStyles,
  titleStyles,
  disableDivider = false,
}) => {
  const [open, setOpen] = useState<boolean>(isModal ?? false);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useLayoutEffect(() => {
    setOpen(isModal);
  }, [isModal]);

  return (
    <ModalComponent
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '310px', md: '500px', lg: '600px' },
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.white,
          border: `1px solid #BAB7B9`,
          borderRadius: '16px',
          '&:focus-visible': {
            outline: 'none',
          },
          ...wrapStyles,
        }}
      >
        {header && (
          <Box
            sx={{
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {typeof header === 'function' ? (
              header()
            ) : (
              <Typography.Title
                variant="h2"
                styles={{ color: colors.black, fontWeight: 600, fontFamily: 'SFP-M' }}
              >
                {header}
              </Typography.Title>
            )}

            <IconButton onClick={handleClose}>
              <RemoveMenuIcon />
            </IconButton>
          </Box>
        )}
        {!disableDivider && <Divider />}
        {body && (
          <Box sx={{ padding: '16px', height: '80%', ...bodyStyles }}>
            {typeof body === 'function' ? body() : body}
          </Box>
        )}
        {footer && (
          <Stack
            sx={{
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 'auto',
            }}
            direction="row"
            spacing={2}
          >
            {typeof footer === 'function' ? footer() : footer}
          </Stack>
        )}
      </Box>
    </ModalComponent>
  );
};

export default Modal;
