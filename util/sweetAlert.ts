import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2'

const mixAlert = Swal.mixin({
    position: 'center',
    confirmButtonText: '확인',
    cancelButtonText: '취소',
})

const fireAlert = (icon: SweetAlertIcon, opt: SweetAlertOptions) => {
    return mixAlert.fire({ ...opt, icon })
}

export const sAlert = {
    warning: (opt: SweetAlertOptions) => fireAlert('warning', opt),
    success: (opt: SweetAlertOptions) => fireAlert('success', opt),
    error: (opt: SweetAlertOptions) => fireAlert('error', opt),
}
