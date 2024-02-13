import { NavLink } from 'react-router-dom';
import { TopbarStyled } from './TopbarStyled';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { TopbarProps } from '../../models/Topbar';

export default function Topbar({ logo }: TopbarProps) {
  return (
    <TopbarStyled>
      <div
        className={`flex flex-1 justify-center items-end mb-${logo ? '10' : '4'}`}
        style={{
          borderBottom: '1px solid #ddd',
          boxShadow: '0 1px 0 0 #fff, 0 -1px 0 0 #ddd',
          borderTop: '1px solid #fff',
        }}
      >
        <div className="p-2 relative block" style={{ top: -56, left: 20, width: 100 }}>
          {logo && (
            <NavLink to="/list">
              <img
                width={60}
                className="m-auto block absolute"
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Meal_ready.svg"
                alt=""
              />
            </NavLink>
          )}
        </div>

        <div className="flex flex-1 justify-end items-end">
          <ul className="flex p-3 text-blue-gray-600">
            <li className="mx-4 hover:underline">
              <NavLink to="#" title="Settings - Fake">
                <UserCircleIcon strokeWidth={2} className="h-6 w-6" />
              </NavLink>
            </li>
            <li className="mx-4 hover:underline">
              <NavLink to="/meals">Public Meals</NavLink>
            </li>
            <li className="mx-4 hover:underline">
              <NavLink to="/">
                Logout <small>(fake)</small>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </TopbarStyled>
  );
}
