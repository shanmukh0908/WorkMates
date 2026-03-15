import categories from "../../../categories"
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

export default function CategoryFeatures({dispatch,styles,state}){

  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const options = categories()
    localStorage.setItem("categories", JSON.stringify(options));
    const stored = JSON.parse(localStorage.getItem("categories") || "[]");
    setCategoryOptions(stored);
  }, []);

    return (
        <div className={styles.categoryBox}>
                  <p>Choose a category</p>
                  <div>
                    <CreatableSelect
                    isClearable
                    options={categoryOptions}
                    placeholder="Select or type a category..."
                    classNamePrefix="mySelect"
                    value={
                      state?.skills
                        ? { value: state.skills, label: state.skills }
                        : null
                    }
                    onChange={(selectedOption) =>
                      dispatch({
                        type: "APPLY_CATEGORYFILTER",
                        payload: selectedOption ? selectedOption.value : "",
                      })
                    }
                  />
                  </div>
                </div>
    )
}