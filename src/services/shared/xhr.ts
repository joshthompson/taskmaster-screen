class XHR {
	public execute(url: string, method: string, data: any = null) {
		const headers = {
			Accept: 'application/json'
		}
		const body = data ? JSON.stringify(data) : null
		const options = { method, headers, body }
		return fetch(url, options)
			.then((response) => response.json().then((json) => [response.ok, json]))
			.then(([ok, json]) => ok ? Promise.resolve(json) : Promise.reject(json))
	}

	public get(url: string) {
		return this.execute(url, 'GET', null)
	}

	public post(url: string, data: any = null) {
		return this.execute(url, 'POST', data)
	}

	public put(url: string, data: any = null) {
		return this.execute(url, 'PUT', data)
	}

	public delete(url: string) {
		return this.execute(url, 'DELETE', null)
	}
}

const xhr = new XHR()
export default xhr
