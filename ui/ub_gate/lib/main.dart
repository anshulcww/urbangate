import 'package:flutter/material.dart';
import 'package:';
import 'Gaurd_welcome_sceen.dart';
void main(){
  runApp(MaterialApp(

    initialRoute: Loginpage.id,
    routes:{ Loginpage.id: (context) => Loginpage(),
      Gaurd_welcome_screen.id: (context) => Gaurd_welcome_screen(),


    } ,
  )
  );
}