//发送ajax请求
import config from './config'
export default (url, data = {}, method = "GET") => {
	return new Promise((reslove, reject) => {
		wx.request({
			url: config.host + url,
			data,
			method,
			success: (res) => {
				reslove(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}