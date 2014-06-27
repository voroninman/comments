var Comment = Backbone.Model.extend({
  defaults: {
    avatar: null,
    name: null,
    content: null,
    productID: null
  },
  url: function() {
    return '/products/'+ this.get('productID') + '/comments';
  }
});

var CommentView = Backbone.View.extend({
  template: _.template($('#comment-template').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

var CommentsCollection = Backbone.Collection.extend({
  model: Comment,
  url: function() {
    return '/products/'+ this.view.getID() + '/comments';
  }
});

var CommentsView = Backbone.View.extend({
  events: {
    'click .add-comment': 'addComment',
    'click .expand-list': 'expandList'
  },
  initialize: function() {
    this.collection = new CommentsCollection();
    this.collection.view = this;

    this.listenTo(this.collection, 'append', this.append);
    this.listenTo(this.collection, 'fill', this.render);
  },
  addComment: function() {
    var message = this.$('input').val();
    var comment = new Comment({ content: message, 'productID': this.getID() });

    comment.save();
    this.collection.add(comment);
    this.collection.trigger('append', comment);
  },
  append: function(comment) {
    var view = new CommentView({ model: comment });

    this.$('.comments-list').append(view.render().$el);
  },
  getID: function() {
    return this.$el.data('product-id');
  },
  expandList: function() {
    this.collection.fetch({ success: function(collection) {
      collection.trigger('fill');
    }});
  },
  render: function() {
    var self = this;

    this.$('.comments-list').empty();
    this.collection.models.forEach(function(comment){
      self.append(comment);
    });
  }
});
