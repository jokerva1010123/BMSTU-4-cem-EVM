
#include <LPC24xx.H>
#include <string.h>


char str[255],cur_log[9],cur_pas[9],rx; 
int i;
const char log[9] = "root";
const char pas[9] = "12345678";


//���������� ���������� UART0 RDA � CTI
void UART0_Int(void) __irq
{	
		unsigned int j;
        void *pos;

		 //������ �� FIFO ������ ����� ������
		 while (U0LSR & 0x01) {
		    //��������� ���� � �������� ����������
		 	rx=U0RBR;
			//��������� � str
			memmove(&str[strlen(str)],&rx,1);
			if (rx==0xD) {i++;}
		 }
		 if (i>=2) {
			 //�������� ��� ������
		 	 i=0;
     		 memset(cur_log,0,9);
     		 memset(cur_pas,0,9);
             pos = memchr (str, 0xD, sizeof (str));
             if (pos != NULL) {
    			 //�������� ���� login
                 j=(int)pos-(int)str;
    			 memmove(&cur_log,&str,j);
			     memmove(&str,&str[j+1],strlen(str));
                 pos = memchr (str, 0xD, sizeof (str));
                 if (pos != NULL) {
		    	     //�������� ���� password
                    j=(int)pos-(int)str;
			        memmove(&cur_pas,&str,j);
			        memmove(&str,&str[j+1],strlen(str));
        			 //�������� ���������� �����������
  			        while (!(U0LSR & 0x20));
			        if ((memcmp(cur_log,log,9)==0)&&(memcmp(cur_pas,pas,9)==0)) {
			        //������������� ����������� �������!
			 	        U0RBR=0x31;}
			        else {	   
			        //������������� ����������� ��������!
			 	        U0RBR=0x30;}
                  }
             }
		 }
       	VICVectAddr = 0; /*�������� VIC*/

}


void UART0_Init (void)						
{             
//��������� �������������� UART0 ������� ������/������� P0.2 � P0.3: RxD � TxD  	   
  PINSEL0 	= 0x00000050;
//���������� ��������� ��������: 8 ���, ��� �������� ��������, 1 �������� ���
//+��������� ������ �������� ������� CLK_UART0
  U0LCR = 0x00000083;                      
//���������� �������� ������� �� �������� 115200 ��� ������� CLK_UART0 = 15MHz  
  U0DLL = 0x00000008;                      
//����������� �������� �������
  U0LCR = 0x00000003; 
//��������������� FIFO ����� �� ����� 8-�� ����.
  U0FCR = 0x00000081;
//��������� ���������� �� ������
  U0IER = 0x00000001;
//�������� ����� ����������� ���������� � ������� ��������
  VICVectAddr6 = (unsigned)UART0_Int;	
//��������� ����� ���������
  VICVectCntl6 = 0x00000026;
//��� FIQ
  VICIntSelect = 0x40;
//��������� ����������							 
  VICIntEnable |= 0x00000040;	
	
}

int main(void)
{
	UART0_Init();
	for (;;){}
}
