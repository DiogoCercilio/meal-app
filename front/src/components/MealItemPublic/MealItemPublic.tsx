interface MealItemPublicProps {
  data: any;
}

function MealItemPublic({ data }: MealItemPublicProps) {
  return (
    <div className="flex bg-white shadow-md rounded-md p-4 mb-2 text-blue-gray-700 justify-center items-center">
      <img width={80} height={80} src={data.image} alt="" />
      
      <h3 style={{minWidth: 200}}  className="ml-2 text-center font-bold">
        {data.name}
      </h3>
      
      <p className="flex-1">
        description: {data.description}
      </p>
      
      <p className="flex-1">
        calories: {data.calories}
      </p>
    </div>
  )
}

export default MealItemPublic;
