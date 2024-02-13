import { MealItemCardProps } from '../../models/MealInterface';

function MealItemCard({ category, onClick }: MealItemCardProps) {
  return (
    <div className="p-1 shadow-md bg-white m-2 rounded-xs relative justify-center" onClick={() => onClick(category)}>
      <div
        className="relative flex align-center justify-center cursor-pointer"
        style={{
          backgroundImage: `url(${category.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minWidth: 150,
          height: 60,
        }}
      >
        <h2
          className="font-bold bg-[#0007] hover:bg-[#0001] h-full mb-2 text-white w-full grid m-auto text-center items-center transition-all"
          style={{ textShadow: '1px 1px 4px #000' }}
        >
          {category.name}
        </h2>
      </div>
    </div>
  );
}

export default MealItemCard;
