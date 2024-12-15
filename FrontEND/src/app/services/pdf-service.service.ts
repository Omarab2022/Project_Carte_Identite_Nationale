// pdf-service.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {
  constructor() { }

  private async loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  public async generatePdf(
    elementId: string,
    pdfName: string,
    leftLogoUrl: string,
    rightLogoUrl: string
  ): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID ${elementId} not found`);
      return;
    }

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageHeight = 297;
      const pageWidth = 210;
      const margin = 10;
      const logoHeight = 15;
      const logoWidth = 15;

      const [leftLogo, rightLogo] = await Promise.all([
        this.loadImage(leftLogoUrl),
        this.loadImage(rightLogoUrl)
      ]);

      const leftLogoCanvas = document.createElement('canvas');
      const rightLogoCanvas = document.createElement('canvas');
      [leftLogoCanvas, rightLogoCanvas].forEach((canvas, index) => {
        const logo = index === 0 ? leftLogo : rightLogo;
        canvas.width = logo.width;
        canvas.height = logo.height;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.drawImage(logo, 0, 0);
      });

      const leftLogoData = leftLogoCanvas.toDataURL('image/png');
      const rightLogoData = rightLogoCanvas.toDataURL('image/png');

      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');

      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(leftLogoData, 'PNG', margin, margin, logoWidth, logoHeight);
      pdf.addImage(rightLogoData, 'PNG', pageWidth - margin - logoWidth, margin, logoWidth, logoHeight);
      pdf.addImage(imgData, 'PNG', margin, margin + logoHeight + 5, imgWidth, imgHeight);

      const totalPages = Math.ceil(imgHeight / (pageHeight - margin - logoHeight - 10));
      for (let i = 1; i < totalPages; i++) {
        pdf.addPage();
        pdf.addImage(leftLogoData, 'PNG', margin, margin, logoWidth, logoHeight);
        pdf.addImage(rightLogoData, 'PNG', pageWidth - margin - logoWidth, margin, logoWidth, logoHeight);
        pdf.addImage(imgData, 'PNG', margin, margin + logoHeight + 5 - i * (pageHeight - margin - logoHeight - 10), imgWidth, imgHeight);
        pdf.text(`Page ${i + 1}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
      }

      pdf.save(`${pdfName}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }
}
