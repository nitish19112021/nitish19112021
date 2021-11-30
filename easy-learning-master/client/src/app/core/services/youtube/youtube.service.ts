import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  getBroadcastData(token){
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${token}`)
    }
    return this.http.get('https://www.googleapis.com/youtube/v3/liveBroadcasts?broadcastStatus=upcoming&broadcastType=all&part=snippet&maxResults=50',header)
  }
}
