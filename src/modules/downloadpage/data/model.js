import * as Yup from 'yup'

export const downloaddata = () => ({
    fromdate: "",
    todate: "",
    company_name: "",
    opening_date: "",
    used:"y"
})


export const downloadSchema = Yup.object({
    company_name: Yup.string()
        .required('Tally Company Name (Required)'),
    fromdate: Yup.string()
        .required('From Date (Required)'),
    todate: Yup.string().required('To Date (Required)'),
    opening_date: Yup.string()
        .required('Opening Date (Required)'),
})
