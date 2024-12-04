# [qunitIntro](https://github.com/rhildred/qunitIntro)

## Simple qunit examples, for Mobile class.

Qunit is also a strong framework for doing test driven development. In this example, we also look at Mocks, a powerful way of isolating a javascript unit from it's backend service.

### [Basic Unit Test](https://rhildred.github.io/qUnitIntro/test1.html)

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QUnit basic example</title>
  <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-1.22.0.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="//code.jquery.com/qunit/qunit-1.22.0.js"></script>
  <script>
    QUnit.test( "a basic test example", function( assert ) {
      var value = "hello";
      assert.equal( value, "hello", "We expect value to be hello" );
    });
  </script>
</body>
</html>

```
A QUnit test contains at least 1 assertion. In this case `assert.equal( value, "hello", "We expect value to be hello" );`

### Most things in Javascript depend on the [observer pattern](https://rhildred.github.io/qUnitIntro/test2.html)

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QUnit async example</title>
  <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-1.22.0.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="//code.jquery.com/qunit/qunit-1.22.0.js"></script>
  <script>
    QUnit.test( "a test of 2 async tests example", function( assert ) {
       assert.expect( 2 );
       
        var done1 = assert.async();
        var done2 = assert.async();
        setTimeout(function() {
          assert.ok( true, "test resumed from async operation 1!" );
          done1();
        }, 500 );
        setTimeout(function() {
          assert.ok( true, "test resumed from async operation 2!" );
          done2();
        }, 150);
    });
  </script>
</body>
</html>
```

`assert.expect` and `assert.async` allow us to know when our observations are complete.

### [.ajax for api testing](https://rhildred.github.io/qUnitIntro/firebasetest.html)

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>QUnit Ajax example</title>
        <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-1.22.0.css">
    </head>
    <body>
        <div id="qunit"></div>
        <div id="qunit-fixture"></div>
        <script src="//code.jquery.com/qunit/qunit-1.22.0.js"></script>
        <script src="https://code.jquery.com/jquery-1.12.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mockjax/1.6.2/jquery.mockjax.js"></script>
        <script>
            
            
            QUnit.test( "test of new firebase url", function( assert ) {
                assert.expect( 2 );
                var done = assert.async();
                var done2 = assert.async();
                jQuery.ajax({
                    url: "https://dazzling-heat-1553.firebaseio.com/tests.json"
                }).done(function(data){
                    assert.ok(data != null, JSON.stringify(data));
                    done();
                }).fail(function(err){
                    assert.ok( false, JSON.stringify(err) );
                    done();
                });
                jQuery.ajax({
                    url: "https://dazzling-heat-1553.firebaseio.com/tests2.json"
                }).done(function(data){
                    assert.ok(data != null, JSON.stringify(data));
                    done2();
                }).fail(function(err){
                    assert.ok( false, JSON.stringify(err) );
                    done2();
                });
            });
        </script>
    </body>
</html>

```

The above is a failing test until we add to firebase:

```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
        "tests":{
          ".read":true
        }

  }
}

```

Perhaps just out of habit, I like to do my api testing with jQuery.ajax. This is an example of testing my endpoint on the firebase api. Note the use of `assert.expect` and `assert.async`.

### [Mockjax mock](https://rhildred.github.io/qUnitIntro/mockjax.html)

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>QUnit mockjax example</title>
        <link rel="stylesheet" href="https://code.jquery.com/qunit/qunit-1.22.0.css">
    </head>
    <body>
        <div id="qunit"></div>
        <div id="qunit-fixture"></div>
        <script src="//code.jquery.com/qunit/qunit-1.22.0.js"></script>
        <script src="https://code.jquery.com/jquery-1.12.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mockjax/1.6.2/jquery.mockjax.js"></script>
        <script>
            jQuery.mockjax({
              url: "/restful/fortune",
              responseText: {
                status: "success",
                fortune: "Are you a mock turtle?"
              }
            });
            
            
            QUnit.test( "test of mockjax url", function( assert ) {
                assert.expect( 1 );
                var done = assert.async();
                jQuery.ajax({
                    url: "/restful/fortune"
                }).done(function(data){
                    assert.ok(data != null, JSON.stringify(data));
                    done();
                }).fail(function(err){
                    assert.ok( false, JSON.stringify(err) );
                    done();
                });
            });
        </script>
    </body>
</html>
```

This example is just like the previous except for:

```
            jQuery.mockjax({
              url: "/restful/fortune",
              responseText: {
                status: "success",
                fortune: "Are you a mock turtle?"
              }
            });

```

The mock, "stubs out" an api call allowing us to test client code independent of the api. This allows the client team to work seperately from the api team, or without internet as the case may be.
