import { Dialog as _Dialog, DialogHeader, DialogBody } from '@material-tailwind/react';
import { DialogDataProps } from '../../models/DialogInterface';

export default function Dialog({ handleOpen, open, data, size = 'xl' }: DialogDataProps) {
  return (
    <_Dialog open={open} handler={handleOpen} size={size}>
      <DialogHeader>{data?.title || ''}</DialogHeader>

      <DialogBody divider className="overflow-scroll">
        {typeof data?.content === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: data?.content }} />
        ) : (
          data?.content
        )}
      </DialogBody>
    </_Dialog>
  );
}
