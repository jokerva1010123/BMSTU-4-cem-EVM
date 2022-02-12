
#include <LPC24xx.H>
#include <string.h>


char str[255],cur_log[9],cur_pas[9],rx; 
int i;
const char log[9] = "root";
const char pas[9] = "12345678";


//Обработчик прерываний UART0 RDA и CTI
void UART0_Int(void) __irq
{	
		unsigned int j;
        void *pos;

		 //Читать из FIFO буфера байты данных
		 while (U0LSR & 0x01) {
		    //Прочитать байт и сбросить прерывание
		 	rx=U0RBR;
			//Сохранить в str
			memmove(&str[strlen(str)],&rx,1);
			if (rx==0xD) {i++;}
		 }
		 if (i>=2) {
			 //Получены две строки
		 	 i=0;
     		 memset(cur_log,0,9);
     		 memset(cur_pas,0,9);
             pos = memchr (str, 0xD, sizeof (str));
             if (pos != NULL) {
    			 //Получить поле login
                 j=(int)pos-(int)str;
    			 memmove(&cur_log,&str,j);
			     memmove(&str,&str[j+1],strlen(str));
                 pos = memchr (str, 0xD, sizeof (str));
                 if (pos != NULL) {
		    	     //Получить поле password
                    j=(int)pos-(int)str;
			        memmove(&cur_pas,&str,j);
			        memmove(&str,&str[j+1],strlen(str));
        			 //Ожидание готовности передатчика
  			        while (!(U0LSR & 0x20));
			        if ((memcmp(cur_log,log,9)==0)&&(memcmp(cur_pas,pas,9)==0)) {
			        //Идентификация закончилась успешно!
			 	        U0RBR=0x31;}
			        else {	   
			        //Идентификация закончилась неудачей!
			 	        U0RBR=0x30;}
                  }
             }
		 }
       	VICVectAddr = 0; /*Сбросить VIC*/

}


void UART0_Init (void)						
{             
//Разрешить альтернативные UART0 функции входов/выходов P0.2 и P0.3: RxD и TxD  	   
  PINSEL0 	= 0x00000050;
//Установить параметры передачи: 8 бит, без контроля четности, 1 стоповый бит
//+Разрешить запись делителя частоты CLK_UART0
  U0LCR = 0x00000083;                      
//Установить делитель частоты на скорость 115200 при частоте CLK_UART0 = 15MHz  
  U0DLL = 0x00000008;                      
//Фиксировать делитель частоты
  U0LCR = 0x00000003; 
//Программировать FIFO буфер на прием 8-ми байт.
  U0FCR = 0x00000081;
//Разрешить прерывание по приему
  U0IER = 0x00000001;
//Записать адрес обработчика прерывания в таблицу векторов
  VICVectAddr6 = (unsigned)UART0_Int;	
//Настроить канал обработки
  VICVectCntl6 = 0x00000026;
//Для FIQ
  VICIntSelect = 0x40;
//Разрешить прерывания							 
  VICIntEnable |= 0x00000040;	
	
}

int main(void)
{
	UART0_Init();
	for (;;){}
}
