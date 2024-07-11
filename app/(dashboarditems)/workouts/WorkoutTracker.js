// 'use client'
// import React, { useState } from "react";
// import { createClient } from '../../utils/supabase/client';
// import exerciseData from './exerciseData';

// const WorkoutTracker = () => {
//     const supabase = createClient();
//     const initialFormData = { weight: "", reps: "", exercise: ""};
//     const [formData, setFormData] = useState({ excercise: "" });
//     const [setsData, setSetsData] = useState ({weight:"", reps:""})
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [showForm, setShowForm] = useState(false);
//     const [showSets, setShowSets] = useState(false);

//     const updateTable = async (userData) => {
//         const { data, error } = await supabase
//             .from('workouts')
//             .insert({ excercise: userData.excercise, sets: userData.sets, weight: userData.weight, reps: userData.reps });

//         if (error) {
//             console.log(error);
//         }

//         if (data) {
//             console.log(data);
//         }
//     }

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevValue => ({
//             ...prevValue,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setSubmittedData(formData);
//         updateTable(formData);
//         setFormData(initialFormData);
//         setShowDropdown(false);
//     };

//     const handleExerciseClick = (excercise) => {
//         setFormData(prevValue => ({
//             ...prevValue,
//             excercise: excercise
//         }));
//         setShowDropdown(false);
//         setShowSets(true);
//     };

//     const handleFormClick = () => {
//         setShowForm(prevValue => !prevValue);
//     }

//     return (
//         <div className="py-64">
//             <button onClick={handleFormClick}>Start An Empty Workout</button>
//             <div>
//                 {showForm && (
//                     <form onSubmit={handleSubmit} className="flex flex-col">
//                         <input
//                             type="text"
//                             placeholder="excercise"
//                             onChange={handleChange}
//                             name="excercise"
//                             value={formData.excercise}
//                             className='border'
//                             onFocus={() => setShowDropdown(true)}
//                             onBlur={() => setShowDropdown(false)}
//                         />
//                         {showSets && setsData.map((sets, index) => (
//                             <>
//                                 <div className="flex flex-row">
//                                     <h1 className="pr-8">Set {index + 1}</h1>
//                                     <input
//                                         type="text"
//                                         placeholder="weight"
//                                         onChange={handleChange}
//                                         name="weight"
//                                         value={sets.weight}
//                                         className='border'
//                                     />
//                                     <input
//                                         type="text"
//                                         placeholder="reps"
//                                         onChange={handleChange}
//                                         name="reps"
//                                         value={sets.reps}
//                                         className="border"
//                                     />
//                                 </div>
//                                 {/* <button onClick={() => setSetNumber(setNumber +1)}>Add More Sets</button> */}
//                                 <button type="submit" className='border'>Submit</button>
//                             </>
//                         ))}
//                     </form>
//                 )}
//                 {submittedData.excercise.length > 0 ? <h1 className="border">{submittedData.excercise}</h1> : <h1></h1>}
//                 {submittedData.sets > 0 ? <h1 className="border">{submittedData.sets}</h1> : <h1></h1>}
//                 {submittedData.weight > 0 ? <h1 className="border">{submittedData.weight} kg</h1> : <h1></h1>}
//                 {submittedData.reps > 0 ? <h1 className="border ">{submittedData.reps}</h1> : <h1></h1>}
//                 <div>
//                     {showDropdown && (
//                         <DropDown handleExerciseClick={handleExerciseClick} />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// const DropDown = ({ handleExerciseClick }) => {
//     return (
//         <div>
//             {exerciseData.map((item) => (
//                 <h1 key={item.id} onMouseDown={() => handleExerciseClick(item.excercise)}>{item.excercise}</h1>
//             ))}
//         </div>
//     );
// };

// export default WorkoutTracker;

"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import exerciseData from "./exerciseData";

const WorkoutTracker = () => {
  const supabase = createClient();
  const initialFormData = { weight: "", reps: "", exercise: "", sets: "" };
  const [formData, setFormData] = useState({
    weight: "",
    reps: "",
    excercise: "",
    sets: "",
  });
  const [submittedData, setSubmittedData] = useState({
    weight: 0,
    reps: 0,
    excercise: "",
    sets: 0,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSets, setShowSets] = useState(false);
  const [setNumber, setSetNumber] = useState(1);

  const updateTable = async (userData) => {
    const { data, error } = await supabase
      .from("workouts")
      .insert({
        excercise: userData.excercise,
        sets: userData.sets,
        weight: userData.weight,
        reps: userData.reps,
      });

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedData(formData);
    updateTable(formData);
    setFormData(initialFormData);
    setShowDropdown(false);
  };

  const handleExerciseClick = (excercise) => {
    setFormData((prevValue) => ({
      ...prevValue,
      excercise: excercise,
    }));
    setShowDropdown(false);
    setShowSets(true);
  };

  const handleFormClick = () => {
    setShowForm((prevValue) => !prevValue);
  };

  return (
    <div className="py-64">
      <button onClick={handleFormClick}>Start An Empty Workout</button>
      <div>
        {showForm && (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="excercise"
              onChange={handleChange}
              name="excercise"
              value={formData.excercise}
              className="border"
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setShowDropdown(false)}
            />
            {showSets && (
              <>
                {/* <input
                                    type="text"
                                    placeholder="sets"
                                    onChange={handleChange}
                                    name="sets"
                                    value={formData.sets}
                                    className='border'
                                /> */}

                <div className="flex flex-row">
                  <h1 className="pr-8">Set {setNumber}</h1>
                  <input
                    type="text"
                    placeholder="weight"
                    onChange={handleChange}
                    name="weight"
                    value={formData.weight}
                    className="border"
                  />
                  <input
                    type="text"
                    placeholder="reps"
                    onChange={handleChange}
                    name="reps"
                    value={formData.reps}
                    className="border"
                  />
                </div>
                <button onClick={() => setSetNumber(setNumber + 1)}>
                  Add More Sets
                </button>
                <button type="submit" className="border">
                  Submit
                </button>
              </>
            )}
          </form>
        )}
        {submittedData.excercise.length > 0 ? (
          <h1 className="border">{submittedData.excercise}</h1>
        ) : (
          <h1></h1>
        )}
        {submittedData.sets > 0 ? (
          <h1 className="border">{submittedData.sets}</h1>
        ) : (
          <h1></h1>
        )}
        {submittedData.weight > 0 ? (
          <h1 className="border">{submittedData.weight} kg</h1>
        ) : (
          <h1></h1>
        )}
        {submittedData.reps > 0 ? (
          <h1 className="border ">{submittedData.reps}</h1>
        ) : (
          <h1></h1>
        )}
        <div>
          {showDropdown && (
            <DropDown handleExerciseClick={handleExerciseClick} />
          )}
        </div>
      </div>
    </div>
  );
};

const DropDown = ({ handleExerciseClick }) => {
  return (
    <div>
      {exerciseData.map((item) => (
        <h1
          key={item.id}
          onMouseDown={() => handleExerciseClick(item.excercise)}
        >
          {item.excercise}
        </h1>
      ))}
    </div>
  );
};

export default WorkoutTracker;
