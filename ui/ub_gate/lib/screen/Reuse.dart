import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';


class ReusableCard extends StatelessWidget {
  ReusableCard({ this.cardChild, this.onPress,@required this.icon_name  });

  final String icon_name ;
  final Widget cardChild;
  final Function onPress;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPress,
      child: Column(
        children: [
          Container(width:100 ,height: 100,
            child: cardChild,
            margin: EdgeInsets.all(15.0),
            decoration: BoxDecoration(color:Color(0xFF404040) ,
//              color: Color(0xFF404040),
              borderRadius: BorderRadius.circular(10.0),
            ),
          ),
          Text(icon_name,
            textAlign: TextAlign.center,
            style: TextStyle(color: Color(0xFF404040),
                fontWeight: FontWeight.bold

            ),)
        ],
      ),
    );
  }
}
