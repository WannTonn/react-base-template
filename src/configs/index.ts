const env = import.meta.env.VITE_ENV;

const baseConfigs = {
  env,
  api: {
    timeout: 60 * 60 * 10,
    baseUrl: import.meta.env.VITE_BASE_URL
  },
  FormBaseLayout: {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 }
  }
}

const configs = {...baseConfigs}
export default configs;
