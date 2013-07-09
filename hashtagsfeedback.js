Questions = new Meteor.Collection("questions");
Prompts = new Meteor.Collection("prompts");
Answers = new Meteor.Collection("answers");


if (Meteor.isClient) {

  Template.hello.username = function() {
    return Session.get("name");
  };

  Template.wall.questions = function() {
    return Questions.find();
  };

  Template.prompts.prompts = function() {
    return Prompts.find();
  };


  Template.wall.events({
    'click input.add': function(){
      if(Session.get("name")){
        var new_question = document.getElementById("new_question").value;
        if(new_question){
          Questions.insert({asker: Session.get("name"), content: new_question, score: 0, replies:[]});

          document.getElementById("new_question").value = '';
        }
      } else {
        alert("Please enter your name");
      }
    },

    'click input.delete': function(){
      Questions.remove(this._id);
    },

    'click input.vote_up': function(){
      Questions.update(this._id, {$inc: {score: 1}});
    },

    'click input.replyBtn': function(e){
      var reply = $(e.target.parentElement).find('.replyText').val();
      Questions.update(this._id, {$push: {replies: {answer_score: 0, stuff: reply, answerer: Session.get("name")}}});
    }

  });

  Template.prompts.events({
    'click input.add': function(){
      if(Session.get("name")){
        var new_prompt = $(".new_prompt").val();
        if(new_prompt){
          var prompt = Prompts.insert({asker: Session.get("name"), content: new_prompt, score: 0, replies:[]});
          $(".new_prompt").val();
        }
      } else {
        alert("Please enter your name");
      }
    },

    'click input.vote_up': function(event){
      if(Session.get(this._id)){
        return;
      }
      Session.set(this._id, true);
      Prompts.update(this._id, {$inc: {score: 1}});
    },

    'click input.delete': function(){
      Prompts.remove(this._id);
    }

  });

  Template.hello.events({
    'click input.submit_name': function(){
      Session.set("name", document.getElementById("user_name").value);
      document.getElementById("user_name").value = "";
    }
  });

}


if (Meteor.isServer) {
  Meteor.startup(function () {

    });
}
