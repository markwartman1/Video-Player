import { Video } from "../models/video.model";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VideoService {
    observed_videos = new Subject<Video[]>();
    videos: Video [] = [];
    // [
    //     { title: 'Title 1', url: 'poiupoiu', description: 'Title 1 content here...' },
    //     { title: 'Title 2', url: 'poiupoiu', description: 'Title 2 content here...' },
    //     { title: 'Title 3', url: 'poiupoiu', description: 'Title 3 content here...' },
    // ];
    private selectedVideoIndex: number = 0;
    //isExistingVideo: boolean = false;
    private _getUrl = "http://localhost:3000/videos";
    private _postUrl = "http://localhost:3000/video";
    private _deleteUrl = "http://localhost:3000/video/";
    private _putUrl = "http://localhost:3000/video/";

    constructor( private http: HttpClient ) {}

    // CREATE CREATE CREATE CREATE
    createVideo(video: Video) {
        this.http.post(this._postUrl, video).subscribe(() => {
            this.videos.push(video);
            this.observed_videos.next(this.videos);
        });
        
    }

    // READ READ READ READ
    setDispVid(index: number) {
        this.selectedVideoIndex = index;
        this.observed_videos.next(this.videos);     // comment this out?????
    }

    getDispVid(): Video {
        console.log('from service file.getDispVid() id is: ' + this.videos[this.selectedVideoIndex]._id);
        return this.videos[this.selectedVideoIndex];
    }
    getVideos() {
        return this.http.get<Video[]>(this._getUrl).subscribe((res) => {
            this.videos = res;
            this.observed_videos.next(this.videos);
        });
        //return this.videos;
    }

    updatedListner() {
        return this.observed_videos.asObservable();
    }


    // UPDATE UPDATE UPDATE UPDATE
    updateVideo(video: Video) {
        console.log("From videoService.updateVideo() title is: " + video.title);
        console.log("From videoService.updateVideo() id is: " + video._id);
        this.http.put(this._putUrl + video._id, video).subscribe(() => {
            for(let i = 0; i < this.videos.length; i++){
                if(video._id === this.videos[i]._id){
                    this.videos.splice(i, 1, video);
                }
            }
            this.observed_videos.next(this.videos);
        });
    }

    // DELETE DELETE DELETE DELETE
    deleteVideo(video: Video) {
        for (let i = 0; i < this.videos.length; i++) {
            if (video._id == this.videos[i]._id) {
                this.videos.splice(i, 1);
            }
        }
        this.http.delete(this._deleteUrl + video._id).subscribe(() => {
            this.observed_videos.next(this.videos);
        });
    }
}