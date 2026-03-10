import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

actor {
  type Inquiry = {
    name : Text;
    email : Text;
    message : Text;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      switch (Text.compare(inquiry1.name, inquiry2.name)) {
        case (#equal) { Text.compare(inquiry1.email, inquiry2.email) };
	case (order) { order };
      };
    };
  };

  let inquiries = Map.empty<Principal, Inquiry>();

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text) : async () {
    if (inquiries.containsKey(caller)) { Runtime.trap("This inquiry has already been submitted.") };
    let inquiry : Inquiry = {
      name;
      email;
      message;
    };
    inquiries.add(caller, inquiry);
  };

  public query ({ caller }) func getInquiry() : async Inquiry {
    switch (inquiries.get(caller)) {
      case (null) { Runtime.trap("This inquiry does not exist") };
      case (?inquiry) { inquiry };
    };
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray().sort();
  };
};
