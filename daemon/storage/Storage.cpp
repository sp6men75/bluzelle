#include "Storage.h"

#include <iostream>
#include <boost/lexical_cast.hpp>
#include <boost/uuid/uuid_io.hpp>

#define UNUSED(x) (void)(x)

boost::uuids::nil_generator Storage::nil_uuid_gen;
VEC_BIN_t Storage::nil_value{0};

void Storage::create(
        const std::string& key,
        const VEC_BIN_t& value,
        const UUID_t& transaction_id
)
{
    //const std::string key_str = boost::uuids::to_string(key);
    kv_store_[key] = {std::time(nullptr), value, transaction_id};
}

void Storage::update(
        const std::string& key,
        const VEC_BIN_t& value
)
{
    // TODO: what do we do with the transaction id?
    const std::string key_str = key;
    auto record = kv_store_.find(key_str);
    if(record != kv_store_.end())
    {
        record->second.timestamp_ = std::time(nullptr);
        record->second.value_ = value;
    }
}

void Storage::remove(const std::string& key)
{
    kv_store_.erase(key);
}
