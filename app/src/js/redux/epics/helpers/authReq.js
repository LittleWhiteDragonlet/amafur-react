import su from 'superagent'
import { Observable } from 'rxjs'

const API_HOST = '/api/v1'

export const authGet = (endpoint, token) =>
  Observable.from(
    su.get(`${API_HOST}/${endpoint}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
  )

export const authPost = (endpoint, body, token) =>
  Observable.from(
    su.post(`${API_HOST}/${endpoint}`)
      .send(body)
      .set('Accept', 'application/json')
      .set('Authorization', token)
  )

export const authImagePost = (endpoint, image, token) =>
  Observable.from(
    su.post(`${API_HOST}/${endpoint}`)
      .attach('image', image)
      .set('Accept', 'application/json')
      .set('Authorization', token)
  )

export const authPut = (endpoint, body, token) =>
  Observable.from(
    su.put(`${API_HOST}/${endpoint}`)
      .send(body)
      .set('Accept', 'application/json')
      .set('Authorization', token)
  )

export const authDelete = (endpoint, token) =>
  Observable.from(
    su.delete(`${API_HOST}/${endpoint}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
  )
