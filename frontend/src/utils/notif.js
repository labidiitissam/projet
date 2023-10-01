import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    width:500,
    showConfirmButton: false,
    timer: 2050,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


const notify=(mes,isError)=>{
    Toast.fire({
        icon: isError ? 'error':'success',
        title: mes
    })
}

export { notify }