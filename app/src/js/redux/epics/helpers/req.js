import su from 'superagent'
import { Observable } from 'rxjs'

const API_HOST = '/api/v1'

export const get = endpoint =>
  Observable.from(
    su.get(`${API_HOST}/${endpoint}`)
      .set('Accept', 'application/json')
  )

export const post = (endpoint, body) =>
  Observable.from(
    su.post(`${API_HOST}/${endpoint}`)
      .send(body)
      .set('Accept', 'application/json')
  )

export const put = (endpoint, body) =>
  Observable.from(
    su.put(`${API_HOST}/${endpoint}`)
      .send(body)
      .set('Accept', 'application/json')
  )
