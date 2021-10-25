using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace kanbanApi.Utility
{
    public static class MD5Encrypted
    {
        
       public static string GetMd5Hash(string password)
        {
            // Convert the input string to a byte array and compute the hash.
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            //We converted the data as a parameter to a byte array.
            byte[] array = Encoding.UTF8.GetBytes(password);
            //We have calculated the hash of the array.
            array = md5.ComputeHash(array);
            //We created a StringBuilder object to store hashed data.
            StringBuilder sb = new StringBuilder();
            //We have converted each byte from string into string type.

            foreach (byte ba in array)
            {
                sb.Append(ba.ToString("x2").ToLower());
            }

            //We returned the hexadecimal string.
            return sb.ToString();
        }

    }
}
