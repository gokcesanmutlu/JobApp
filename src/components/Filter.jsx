import { useDispatch } from "react-redux";
import { sortOpt, statusOpt, typeOpt } from "./../constants/index";
import { clearFilters, filterBySearch, sortJobs } from "../redux/slices/jobSlice";
import { useEffect, useState } from "react";

const Filter = ({ jobs }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    // her tuş vuruşunda filtreleme yapar, bu gereksiz filtreler performans sorunu yapar
    // olması gereken, kullanıcı yazma işlemini kestiğinde bir kere action tetiklenmeli 
    // bunun için debounce kullanıyoruz, useeffectle hemen altında yazılan
    // const handleChange = (e) => {
    //     dispatch(filterBySearch(e.target.value))
    // }

    //component did unmount'u yakalar
    useEffect(() => {
        const timer = setTimeout(() => dispatch(filterBySearch({ field: "position", text })), 500)

        return () => clearTimeout(timer)
    }, [text])

    return (
        <section className="filter-sec">
            <h2>Filter Form</h2>
            <form className="form">
                <div>
                    <label>Search with Position's name:</label>
                    <input
                        onChange={(e) => setText(e.target.value)}
                        list="positions"
                        name="positions"
                        type="text"
                    />

                    <datalist id="positions">
                        {jobs.map((job) => (
                            <option value={job.position} />
                        ))}
                    </datalist>
                </div>

                <div>
                    <label>Status</label>
                    <select onChange={(e) => dispatch(filterBySearch({ field: "status", text: e.target.value }))} name="status">
                        <option hidden>Choose</option>

                        {statusOpt.map((text) => {
                            return <option>{text}</option>;
                        })}
                    </select>
                </div>

                <div>
                    <label>Type</label>
                    <select onChange={(e) => dispatch(filterBySearch({ field: "type", text: e.target.value }))} name="type">
                        <option hidden>Choose</option>
                        {typeOpt.map((i) => {
                            return <option>{i}</option>;
                        })}
                    </select>
                </div>

                <div>
                    <label>Sort</label>
                    <select onChange={(e)=>dispatch(sortJobs(e.target.value))} name="type">
                        {sortOpt.map((i) => {
                            return <option>{i}</option>;
                        })}
                    </select>
                </div>

                <div>
                    {/* button type'a reset vermeseydik inputların içi sıfırlanmazdı. alttaki filtrlemeyi
                    clear filters yapardı ama buttonların içindeki yazılar kalırdı. 
                    reset formun içinde özel bir metot  */}
                    <button onClick={()=>dispatch(clearFilters())} className="add-button" type="reset">
                        <span className="button_top">Reset Filters</span>
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Filter;
