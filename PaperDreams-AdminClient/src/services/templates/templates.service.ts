import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, map, Observable, of } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment.prod';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  uploadTemplate(formData: FormData): Observable<any> {
    return from(this.uploadFileToAWS(formData.get('file') as File)).pipe(
      map((res) => res.data) 
    );
  }

  async getDownloadURL(fileName: string) {
    try {
      console.log("getDownloadURL fileName: " + fileName);
      const res = await axios.get(`${this.apiUrl}/upload/download-url/${fileName}`);
      return res.data;
    } catch (error) {
      console.error('שגיאה בהבאת ה-URL:', error);
      Swal.fire({
        title: 'שגיאה',
        text: `שגיאה בהבאת ה-URL: ${error}`,
        icon: 'error',
        confirmButtonText: 'אישור',
        confirmButtonColor: '#5c6bc0'
      });
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
    return this.http.get<any[]>(`${this.apiUrl}/templates/category/${category}`,
      this.getAuthHeaders()
    );
  }

  async uploadFileToAWS(file: File) {

    console.log("in uploas file to AWS");
    console.log(file);
    
    if (!file) return;

    try {
      const res = await axios.get(`${this.apiUrl}/upload/presigned-url?fileName=${file.name}`);
      console.log("res");
      
      console.log(res);
      console.log(file);

      await this.uploadToS3(file, res.data);

      console.log("הקובץ הועלה בהצלחה ל-S3!");

      console.log("--------------before api/TextUpload/upload --------------- ");
      return res.data;

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
    return this.http.post<any>(`${this.apiUrl}/templates/add`, data,
      this.getAuthHeaders()
    );
  }

}
