import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainJobs: [], // Api'den gelen üzerinden filtreleme yaptığımız ana dizi
    jobs: [], // Filtreleme sonucu elde ettiklerimizi aktardığımız
    isLoading: false,
    isError: false,

}

const JobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },

        setError: (state) => {
            state.isError = true;
            state.isLoading = false;


        },
        setJobs: (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.jobs = action.payload;
            state.mainJobs = action.payload;
        },

        createJob: (state, action) => {
            state.jobs.push(action.payload);
        },

        // aratılan şirket ismine göre filtreleme yapma
        filterBySearch: (state, action) => {
            //console.log(action) filterbys. tetikleniyor mu onu kontol ediyorsun
            // arama terimini küçük harfe çevir
            const query = action.payload.text.toLowerCase();

            //arama terimini içeren işleri filtrele
            const filtred = state.mainJobs.filter((job) =>
                job[action.payload.field].toLowerCase().includes(query))
            //ders 02.27.00 da burayı dinamik hale getirmeyi güzel anlatıyor
            state.jobs = filtred

        },

        sortJobs: (state, action) => {
            switch (action.payload) {
                case "a-z":
                    state.jobs.sort((a, b) => a.position.localeCompare(b.position))
                    break;

                case "z-a":
                    state.jobs.sort((a, b) => b.position.localeCompare(a.position))
                    break;

                case "From New":
                    state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date))
                    break;
                // zamansal verileri karşılaştırabilmek için bunları tarih objesine çevirmeliyiz

                case "From Old":
                    state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date))
                    break;


                default:
                    break;
            }
        },

        clearFilters: (state) => {
            state.jobs = state.mainJobs;
        },

        deleteJob: (state, action) => {
            console.log(action)
            state.jobs = state.jobs.filter((i) => i.id !== action.payload)
        }
    },
})

export const { setLoading, setError, setJobs, createJob, filterBySearch, sortJobs, clearFilters,deleteJob } = JobSlice.actions

export default JobSlice.reducer
