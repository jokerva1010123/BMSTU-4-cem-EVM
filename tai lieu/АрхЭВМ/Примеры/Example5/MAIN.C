/*  ��������� ���������� ��� � ���. 
    256 �������� � ��� ����������� � FIFO. 
    �� ��� ������������ ���. ��������
    � �������� �� ��� � UART0.
*/
				  

#include <LPC24xx.H>
#include <stdio.h>


unsigned vol = 0;
unsigned average = 0;
unsigned mas[256];
unsigned last = 0;
double f;





void ADC_Int (void) __irq {
   		vol = (AD0GDR>>6)& 0x3ff;     /* ������ 10 �������� ������*/
		average -= mas[last];
		average += vol;
		mas[last++]=vol;
		last&=0xff;
        DACR = (average>>2)& 0xffc0;
       	VICVectAddr = 0; /*�������� VIC*/

        
}

void Timer0_Int (void) __irq	
{
	f=(average>>8)*0.003222;
	printf("%f\n",f);
	T0IR = 0x00000001; /*�������� ���� ���������� � Timer0*/
       	VICVectAddr = 0; /*�������� VIC*/

}



int main(void)
{
	//������������� ������
	IODIR1 = 0x00FF0000;                     // P1.16..23 defined as Outputs
  	Timer0_Init(); /* ��������� ������ */	
	UART0_Init();
	ADC_Init();	
	DAC_Init();	  
	while(1) {}
}
 
