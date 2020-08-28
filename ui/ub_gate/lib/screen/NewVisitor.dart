import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'Reuse.dart';
import 'Loginbutton.dart';

class NewVisitor extends StatelessWidget {
  static const String id = 'NewVisitor';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(backgroundColor: Colors.white,
      title: Text('New Visitor',style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold,color: Color(0xFF404040)),)
    ),
      body: SingleChildScrollView(
        child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 25),
          child: Column(
            children: [
              ReusableCard(icon_name: 'Photo',cardChild: Icon(FontAwesomeIcons.cameraRetro,color: Colors.white,size: 80,),onPress: (){

              },),
            SizedBox(height: 20,),
            InputData(details: 'Flat Number:' , hintText: 'Address Line 1', data: null),
            InputData(details: 'Name:', hintText: 'Full Name', data: null),
            InputData(details: 'Phone Number:', hintText: 'Phone Number', data: null),
            InputData(details: 'Vehicle Number:', hintText: 'AA-00-AA-0000', data: null),
            Loginbutton(onPressed: null,title: 'Submit', ),

          ],),
        ),
      ),

    );
  }
}

class InputData extends StatelessWidget {
  InputData ({@required this.details,@required this.hintText,@required this.data});
  final String details ;
  final String hintText ;
  final Function data;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [Text(details,style: TextStyle(fontWeight: FontWeight.w500),),
        TextField(
          onChanged: data,
          decoration: InputDecoration(
            hintText: hintText,
            contentPadding:
            EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),

          ),
        ),
           SizedBox(height: 20,)
      ],
    );


  }
}

