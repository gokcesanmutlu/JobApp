import axios from "axios";
import { useEffect } from "react";
import { setJobs, setLoading, setError } from "../redux/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Card from "./../components/Card";
import Filter from "../components/Filter";

const JobList = () => {
  const state = useSelector((store) => store.jobSlice);
  const dispatch = useDispatch();
  console.log(state);

  // api'den verileri alıp store'a aktarır
  const fetchData = () => {
    dispatch(setLoading());

    axios
      .get("http://localhost:4500/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch(() => dispatch(setError()));
  }

  // bileşen ekrana basıldığında verileri çek
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list-page">
      <Filter jobs={state.jobs}/>

      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <p className="error">
          Sorry, we haven't getting data. There is an error.{" "}
          <button onClick={fetchData} type="button" class="button">
            <span class="button__text">Refresh</span>
            <span class="button__icon">
              <img className="svg" src="refresh.svg" alt="" />
            </span>
          </button>
        </p>
      ) : (
        <div className="job-list">
          {state.jobs?.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};
export default JobList;
