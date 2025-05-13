// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TemplatesService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, map, Observable, of } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {
  private apiUrl = 'http://localhost:5077/api/templates/';

  constructor(private http: HttpClient) { }

  // async uploadTemplate(formData: FormData): Promise<Observable<any>> { 
  uploadTemplate(formData: FormData): Observable<any> {
    //העלאת התבנית ל AWS
    return from(this.uploadFileToAWS(formData.get('file') as File)).pipe(
      map((res) => res.data) // Presigned URL from the server
    );




    // // uploadTemplate(formData: FormData): Observable<any> {
    // //העלאת התבנית ל AWS 
    // const res = await this.uploadFileToAWS(formData.get('file') as File);
    // // .then((res) => {
    // //   formData.append('imageUrl',res.data); // Presigned URL from the server
    // // });
    // console.log("res: " + res);


    // // return this.http.post(this.apiUrl, {
    // //   Name:
    // //   Description:
    // //   ImageUrl:
    // //   CategoryId:
    // //   Fields
    // // }, this.getAuthHeaders());


    // return of(res.data); // Presigned URL from the server
    // // return of(formData);
  }

  async getDownloadURL(fileName: string) {
    try {
      console.log("getDownloadURL fileName: " + fileName);
      const res = await axios.get(`http://localhost:5077/api/upload/download-url/${fileName}`);
      return res.data;
    } catch (error) {
      console.error('שגיאה בהבאת ה-URL:', error);
      alert(`שגיאה בהבאת ה-URL: ${error}`);
    }
  };


  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getTemplatesByCategory(category: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}category/${category}`,
      this.getAuthHeaders()
    );
  }




  async uploadFileToAWS(file: File) {

    console.log("in uploas file to AWS");
    console.log(file);
    
    
    if (!file) return;

    try {
      const res = await axios.get(`http://localhost:5077/api/upload/presigned-url?fileName=${file.name}`);
      console.log("res");
      
      console.log(res);
      console.log(file);

      await this.uploadToS3(file, res.data);

      console.log("הקובץ הועלה בהצלחה ל-S3!");

      console.log("--------------before api/TextUpload/upload --------------- ");
      return res.data;//return presigned-url

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  async uploadToS3(file: File, presignedUrl: string) {
    try {

      console.log("uploadToS3");
      console.log(presignedUrl);
      console.log(file);

      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
      });

      console.log("הקובץ הועלה בהצלחה ל-S3!");

    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Failed to upload file to S3.");
    }
  };


  createTemplate(data: any) {
    return this.http.post<any>('http://localhost:5077/api/templates/add', data,
      this.getAuthHeaders()
    );
  }

}
