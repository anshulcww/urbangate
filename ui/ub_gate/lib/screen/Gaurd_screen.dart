import 'package:flutter/material.dart';
import 'package:urban_gate/login_page.dart';
import 'reusecard.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';


class Gaurd_welcome_screen extends StatelessWidget {
  static String id = 'Gaurd_welcome_screen';
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: Row(
        children: [Column(
            children: [
              Container(
                height: 290,width: 410,
                child: Card(
                  child: Image.asset(
                    'images/security.jpg',
                    fit: BoxFit.cover,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  ) ,
                  elevation: 5,
                ),
              ),
              Container(width: 400,height: 350,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.0),
                ),
                padding: EdgeInsets.fromLTRB(60 ,20 ,30 ,0 ),
                child:Row(
                  children: [
                    Row(
                      children: [
                        Column(
                          children: [
                            ReusableCard(icon_name: 'Daily Help',cardChild: Icon(FontAwesomeIcons.snowman,size:50 ,color: Colors.white,),onPress: (){Navigator.pushNamed(context, Loginpage.id);},),
                            SizedBox(height: 20,),
                            ReusableCard(icon_name: 'Vehicles',cardChild: Icon(FontAwesomeIcons.carAlt,size:50,color: Colors.white ),onPress: (){Navigator.pushNamed(context, Loginpage.id);},)],)],),
                    SizedBox(width: 30,),
                    Row(
                      children:
                      [Column(children: [
                        ReusableCard(icon_name: 'Delivery',cardChild: Icon(FontAwesomeIcons.tractor,size:50,color: Colors.white ),onPress: (){Navigator.pushNamed(context, Loginpage.id);},),
                        SizedBox(height: 20,),
                        ReusableCard(icon_name: 'Visitors',cardChild: Icon(FontAwesomeIcons.laugh,size:50,color: Colors.white ),onPress: (){Navigator.pushNamed(context, Loginpage.id);},)],)],),
                  ],
                ),
              ),
              Expanded(child: Row(
                children: [
                  Container( child:
                  Row(children:
                  [FlatButton(onPressed: null, child: Icon(FontAwesomeIcons.home),color: Colors.blue,) ,
                    FlatButton(onPressed: null, child: Icon(FontAwesomeIcons.list)) ,
                  ],)
                    ,width: 410, decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10.0),

                    ),
                  ),
                ],
              ))

//                Container( width: 408,
////                    height: 43,
////                    decoration: BoxDecoration( color: Colors.blue,
////                    borderRadius: BorderRadius.circular(10.0),
////                  ),
////                  child: Row(mainAxisAlignment: MainAxisAlignment.center,
////                    children: [
////                      Column(children: [
////                        FlatButton(onPressed: (){Navigator.pop(context);},
////                            child: Icon(FontAwesomeIcons.home),
////                          padding:EdgeInsets.fromLTRB(0, 0, 0, 10) ,
////                        ),
////                      ],),
////                      Column(children: [FlatButton(onPressed:(){
////                        Navigator.pushNamed(context, Loginpage.id);
////                      }, child: Icon(FontAwesomeIcons.list),
////                      padding:EdgeInsets.fromLTRB(0, 0, 0, 10)  ,
////                      )],)
////                    ],
////                  )
////
////                ),

            ]
        ),
        ],
      ),



    );
  }
}

