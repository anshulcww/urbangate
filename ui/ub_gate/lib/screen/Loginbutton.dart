import 'package:flutter/material.dart';

class Loginbutton extends StatelessWidget {
  Loginbutton({this.title,  @required this.onPressed});


  final String title;
  final Function onPressed;

  @override
  Widget build(BuildContext context) {
    return
      Padding(
        padding: EdgeInsets.symmetric(vertical: 16.0),
        child: Material(
          color: Color(0xFF404040),
          borderRadius: BorderRadius.all(Radius.circular(10.0)),
          elevation: 5.0,
          child: MaterialButton(
            onPressed: () {
              //Implement login functionality.
            },
            minWidth: 400,
            height: 42.0,
            child: Text(
              title, style: TextStyle(color: Colors.white, fontSize: 20),
            ),
          ),
        ),
      );
  }
}