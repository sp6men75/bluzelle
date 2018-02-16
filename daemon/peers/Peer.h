#ifndef BLUZELLE_PEER_H
#define BLUZELLE_PEER_H

#include "NodeInfo.hpp"

#include <memory>
#include <boost/asio/io_service.hpp>

using namespace std;

class Peer
{
private:
    boost::asio::io_service& ios_;
    NodeInfo info_; // This node info.
public:

    Peer(
            boost::asio::io_service& ios,
            NodeInfo &node_info
    )  : ios_(ios),
         info_(node_info)
    {
    }


    const string& name() {return this->info_.name();};

    const string& host() {return this->info_.host();};

    uint16_t port() {return this->info_.port();};

    void send_request(
        const string& req,
        function<string(const string&)> h,
        bool schedule_read
    );
};

#endif //BLUZELLE_PEER_H
