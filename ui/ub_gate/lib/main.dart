import 'package:flutter/material.dart';
import 'screen/Loginpage.dart';
import 'screen/Gaurd_screen.dart';
void main(){
  runApp(MaterialApp(

    initialRoute: Loginpage.id,
    routes:{ Loginpage.id: (context) => Loginpage(),
      Gaurd_welcome_screen.id: (context) => Gaurd_welcome_screen(),


    } ,
  )
  );
}