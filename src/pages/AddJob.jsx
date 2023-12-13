import React, { useEffect } from 'react'
import { statusOpt, typeOpt } from '../constants'
import { v4 } from 'uuid'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { createJob, setError, setJobs, setLoading } from '../redux/slices/jobSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((store) => store.jobSlice)
  console.log(state)

  // bileşen ekrana basıldığında verileri çek
  useEffect(() => {

    dispatch(setLoading());

    axios
      .get("http://localhost:4500/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch(() => dispatch(setError()));

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()

    // hepsine name vermemiz sayesinde formData'yı kullanıp bütün inputlara erişebiliyoruz
    const formData = new FormData(e.target)
    // inputlara yazdığımız tüm verilerin obje halini elde etmemizi sağlar
    const data = Object.fromEntries(formData.entries())

    // işe id ve oluşturulma tarihi ekle
    data.id = v4();
    data.date = new Date().toLocaleDateString();

    // Hem apiye hem store'a işi ekle
    axios.post("http://localhost:4500/jobs", data).then(
      () => {
        navigate("/");
        dispatch(createJob(data))
        toast.success("Added")
      }
    ).catch(console.log(error))
    console.log(data)

    // e.target.reset() başka ekrana navigate etmeseydik bunu kullanabilirdik , 
    // bu button type'da kullandığımız reset'in fonksiyondaki kullanımı bu bütün formdaki inputları sıfırlar
  }

  return (
    <div className="add-page">
      <section className='add-sec'>
        <h2>Add new job.</h2>
        <form onSubmit={handleSubmit} className='form'>
          <div>
            <label>Position</label>
            <input list="positions" name='position' type="text" required />

            <datalist id="positions">
              {state.jobs.map((job) => (<option value={job.position} />))}
            </datalist>
          </div>

          <div>
            <label>Company</label>
            <input list="companies" name='company' type="text" required />

            <datalist id="companies">
              {state.jobs.map((job) => (<option value={job.company} />))}
            </datalist>
          </div>

          <div>
            <label>Location</label>
            <input list='locations' name='location' type="text" required />

            <datalist id='locations'>
              {state.jobs.map((job) => <option value={job.location} />)}
            </datalist>
          </div>

          <div>
            <label>Status</label>
            <select name="status" required>
              <option value={''} hidden>
                Choose</option>
              {/* süslü varsa return şart yoksa ()
              1. yol
              {statusOpt.map((text) => (
                <option>{text}</option>
                ))}*/}
              {statusOpt.map((text) => {
                return <option>{text}</option>
              })}
            </select>
          </div>

          <div>
            <label>Type</label>
            <select name="type" required>
              <option value={''} hidden>Choose</option>
              {typeOpt.map((i) => {
                return <option>{i}</option>
              })}
            </select>
          </div>

          <div>
            <button className='add-button' type='Submit'>
              <span class="button_top"> Add Job
              </span>
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddJob