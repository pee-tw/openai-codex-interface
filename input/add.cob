       IDENTIFICATION DIVISION.
       PROGRAM-ID. SUM-INTEGERS.


       ENVIRONMENT DIVISION.


       DATA DIVISION.
       WORKING-STORAGE SECTION.
       77 A PIC 9999.
       77 B PIC 9999.
       77 ANS PIC 999v99.


       PROCEDURE DIVISION.
       MAIN-PARA.
           DISPLAY " ----------------------------------------------- ".
           DISPLAY " ENTER A ".
           ACCEPT A.
           DISPLAY " ENTER B ".
           ACCEPT B.
           DISPLAY " ----------------------------------------------- ".

       ADD-PARA.
           ADD A B GIVING ANS. 
           DISPLAY " -----------------------------------------------".

       DISP-PARA.
           DISPLAY "A IS " A.
           DISPLAY "B IS " B.
           DISPLAY "ADDITION =" ANS.
           STOP RUN.