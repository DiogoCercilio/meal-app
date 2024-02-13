import axios from 'axios';
import Wrapper from '../Wrapper/Wrapper';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { USER_ID } from '../../pages/ListMeal';
import { Button } from '@material-tailwind/react';
import Dialog from '../Dialog/Dialog';
import { useState } from 'react';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { MealItemProps, UserMeal, UserMealResponse } from '../../models/MealInterface';

const MAX_TIME_IN_MIN_TO_EDIT = 1;

function MealItem({ data, onChange }: MealItemProps) {
  const [open, setOpen] = useState(false);
  const [deletionQueue, setDeletionQueue] = useState<any>();
  const handleOpen = () => {
    setOpen(!open);
  };
  const deleteMeal = (meal: UserMeal) => {
    setDeletionQueue(meal);
    handleOpen();
  };

  const editMeal = (meal: UserMealResponse) => {
    const diffFromCreationInMinutes = moment(meal.created).diff(moment(), 'minutes');

    if (diffFromCreationInMinutes + MAX_TIME_IN_MIN_TO_EDIT < 1) {
      toast.error(`You can't edit a meal register after ${MAX_TIME_IN_MIN_TO_EDIT} minute(s).`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    onChange({ action: 'openEdition', meal: meal });
  };

  const onConfirmExclude = (confirm: boolean) => {
    if (!confirm) {
      onChange();
      setOpen(false);
      return;
    }

    if (deletionQueue?.id) {
      axios.delete(`http://localhost:9000/api/user-meal/${deletionQueue.id}?userId=${USER_ID}`).then(() => {
        onChange({ action: 'excludeConfirmed' });
        setOpen(false);
      });
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col flex-1 bg-white justify-center mb-1 p-3">
        <div className="flex">
          <div
            className="rounded-sm mr-4 flex items-center shadow-xl bg-[#fafafa]"
            style={{
              backgroundImage: `url(${data.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: 100,
              height: 100,
            }}
          ></div>
          <div className="flex-1 text-blue-gray-900 font-thin">
            <div className="flex items-center">
              <strong className="text-blue-600 text-xl flex-1">
                {data.name} ({data.quantity} {data.unitMeasure} - {data.calories} calories)
              </strong>
            </div>
            <p className="text-blue-gray-800 mb-2">{data.description}</p>

            <h4 className="text-xs font-bold text-gray-500">My personal Note:</h4>
            <em className="text-gray-500">{data.details}</em>
            <br />
          </div>

          <div className="flex flex-col justify-center" style={{ minWidth: 100 }}>
            <small className="text-blue-gray-400 text-center">
              <em>{moment(data.created).fromNow()}</em>
            </small>
            <div className="flex items-center justify-center flex-1">
              <div className="px-1">
                <PencilSquareIcon
                  onClick={() => editMeal(data)}
                  strokeWidth={2}
                  className="h-6 w-6 text-gray-400 hover:text-gray-700 cursor-pointer"
                />
              </div>
              <div className="px-1">
                <TrashIcon
                  onClick={() => deleteMeal(data)}
                  strokeWidth={2}
                  className="h-6 w-6 text-red-300 hover:text-red-700 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        handleOpen={handleOpen}
        open={open}
        data={{
          title: 'Exclude Meal',
          content: (
            <div className="flex justify-around w-full">
              <Button variant="outlined" color="gray" onClick={() => onConfirmExclude(false)}>
                Cancel
              </Button>
              <Button color="blue" onClick={() => onConfirmExclude(true)}>
                Confirm
              </Button>
            </div>
          ),
        }}
        size="xs"
      />
      <ToastContainer />
    </Wrapper>
  );
}

export default MealItem;
