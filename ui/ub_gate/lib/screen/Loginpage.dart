
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'Gaurd_screen.dart';
import 'Loginbutton.dart';


class Loginpage extends StatefulWidget {
  static String id ='login_page';
  @override
  _LoginpageState createState() => _LoginpageState();
}

class _LoginpageState extends State<Loginpage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
         body:Column(
 crossAxisAlignment:CrossAxisAlignment.stretch,

           children: <Widget>[
             Flexible(
               child: Hero(
                 tag: 'logo',
                 child: Card(
                  elevation: 5,
                   child: Image.asset('images/logo.png',),
                 ),
               ),
             ),

           Padding(
             padding: EdgeInsets.fromLTRB(45, 0, 45, 0),
             child: Container(height: 350,
             decoration:BoxDecoration(
               border: Border(
             top: BorderSide(
             color: Colors.white12,
             width: 0.0,),
             ), ) ,
               child: Column(children: [ SizedBox(height: 20,),
                 Padding(
                 padding: EdgeInsets.fromLTRB(0, 0, 250, 0),
                 child: Text('Login',style:TextStyle(color: Color(0xFF404040) ,fontSize: 25,fontWeight: FontWeight.bold),),
               ),
                 SizedBox(height: 10,),
                 TextField(
               onChanged: (value) {

                 //Do something with the user input.
               },
               decoration: InputDecoration(
                 hintText: 'Enter your UID',
                 contentPadding:
                 EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
                 border: OutlineInputBorder(
                   // borderRadius: BorderRadius.all(Radius.circular(32.0)),
                 ),
                 enabledBorder: OutlineInputBorder(
                   borderSide:
                   BorderSide(color: Color(0xFF404040) , width: 1.0),
                   // borderRadius: BorderRadius.all(Radius.circular(32.0)),
                 ),
                 focusedBorder: OutlineInputBorder(
                   borderSide:
                   BorderSide(color: Color(0xFF404040) , width: 2.0),
                   // borderRadius: BorderRadius.all(Radius.circular(32.0)),
                 ),
               ),
             ),
               SizedBox(
                 height: 8.0,
               ),

               TextField(
                 onChanged: (value) {
                   //Do something with the user input.
                 },
                 decoration: InputDecoration(
                   hintText: 'Enter your password',
                   contentPadding:
                   EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
                   border: OutlineInputBorder(
                     // borderRadius: BorderRadius.all(Radius.circular(32.0)),
                   ),
                   enabledBorder: OutlineInputBorder(
                     borderSide:
                     BorderSide(color: Color(0xFF404040) , width: 1.0),
                     // borderRadius: BorderRadius.all(Radius.circular(32.0)),
                   ),
                   focusedBorder: OutlineInputBorder(
                     borderSide:
                     BorderSide(color:Color(0xFF404040) , width: 2.0),
                     // borderRadius: BorderRadius.all(Radius.circular(32.0)),
                   ),
                 ),
               ),
               SizedBox(
                 height: 24.0,
               ),
                Loginbutton(onPressed: null,title: 'Login',),
                 Loginbutton(onPressed: null,title: 'Login with OTP',),
          ],
           ),
            ),
           ),
           ],
         ),
        );
  }
}
