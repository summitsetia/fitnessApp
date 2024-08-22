import { Button } from "@/components/ui/button"
import { CirclePlus } from "lucide-react";
import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";



const AddMeal = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center text-3xl font-bold">
                <h1>Add Meals</h1>
                <MealRedirect mealType="Breakfast" />
                <MealRedirect mealType="Lunch" />
                <MealRedirect mealType="Dinner" />
            </div>

        </div>
    )
}

const MealRedirect = ({ mealType }) => {
    return (
        <div className="pt-8">
            <Link href={`/meals?meal=${mealType}`}>
                <Button className="text-base">
                    <UtensilsCrossed className="mr-2 h-6 w-6" />
                    {mealType}
                    <CirclePlus className="ml-2 h-6 w-6" />
                </Button>
            </Link>
        </div>
    )
}


export default AddMeal;

